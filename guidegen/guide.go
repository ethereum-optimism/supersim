package guidegen

import (
	"bytes"
	"fmt"
	"os/exec"
	"strings"
	"text/template"

	"github.com/ethereum-optimism/supersim/config"
)

type Guide struct {
	Title       string         `yaml:"title"`
	Description string         `yaml:"description,omitempty"`
	SetupStep   *SupersimSetup `yaml:"supersim_setup,omitempty"` // Change to *Step
	Steps       []Step         `yaml:"steps"`
}

type SupersimSetup struct {
	Name        string            `yaml:"name"`
	Description string            `yaml:"description,omitempty"`
	Command     string            `yaml:"command"`
	CLIConfig   *config.CLIConfig `yaml:"cli_config,omitempty"`
}

type Step struct {
	Name           string `yaml:"name"`
	Description    string `yaml:"description,omitempty"`
	Command        string `yaml:"command"`
	ExpectedOutput string `yaml:"expected_output,omitempty"`
	Check          *Check `yaml:"check,omitempty"`
}

type Check struct {
	Command string `yaml:"command"`
	Output  string `yaml:"output"`
}

const stepTemplate = `
**{{.Index}}. {{.Name}}**

{{.Description}}:

` + "```sh" + `
{{.Command}}
` + "```" + `
`

func (s Step) Render(index int) (string, error) {
	tmpl, err := template.New("step").Parse(stepTemplate)
	if err != nil {
		return "", err
	}

	data := struct {
		Step
		Index int
	}{
		Step:  s,
		Index: index + 1,
	}

	var buf bytes.Buffer
	if err := tmpl.Execute(&buf, data); err != nil {
		return "", err
	}

	return buf.String(), nil
}

const guideTemplate = `
## 🔀 {{.Title}}

### {{.Description}}

{{.RenderedSteps}}
`

func (g Guide) Render() (string, error) {
	tmpl, err := template.New("guide").Parse(guideTemplate)
	if err != nil {
		return "", err
	}

	var renderedSteps strings.Builder

	// Render setup step as the first step if it exists
	if g.SetupStep != nil {
		setupStepStr, err := g.SetupStep.Render(0)
		if err != nil {
			return "", err
		}
		renderedSteps.WriteString(setupStepStr)
	}

	// Render the rest of the steps
	offset := 0
	if g.SetupStep != nil {
		offset = 1
	}
	for i, step := range g.Steps {
		stepStr, err := step.Render(i + offset)
		if err != nil {
			return "", err
		}
		renderedSteps.WriteString(stepStr)
	}

	data := struct {
		Guide
		RenderedSteps string
	}{
		Guide:         g,
		RenderedSteps: renderedSteps.String(),
	}

	var buf bytes.Buffer
	if err := tmpl.Execute(&buf, data); err != nil {
		return "", err
	}

	return buf.String(), nil
}

func GenerateReadme(guides []Guide) (string, error) {
	var sb strings.Builder
	for _, guide := range guides {
		guideStr, err := guide.Render()
		if err != nil {
			return "", err
		}
		sb.WriteString(guideStr)
		sb.WriteString("\n")
	}
	return sb.String(), nil
}

func (s Step) Run() (string, error) {
	cmd := exec.Command("bash", "-c", s.Command)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("error executing command: %v\nOutput: %s", err, output)
	}
	return string(output), nil
}

func (s Step) CheckOutput(output string) error {
	if s.ExpectedOutput != "" && !strings.Contains(output, s.ExpectedOutput) {
		return fmt.Errorf("output does not contain expected content")
	}
	return nil
}

func (s Step) RunCheck() error {
	if s.Check == nil {
		return nil
	}

	checkCmd := exec.Command("bash", "-c", s.Check.Command)
	checkOutput, err := checkCmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("check command failed: %v\nOutput: %s", err, checkOutput)
	}

	if !strings.Contains(string(checkOutput), s.Check.Output) {
		return fmt.Errorf("check output does not contain expected content")
	}

	return nil
}

func (g Guide) Run() error {
	fmt.Printf("Running guide: %s\n", g.Title)

	if g.SetupStep != nil {
		fmt.Printf("Running setup step in background: %s\n", g.SetupStep.Command)
		cmd := exec.Command("bash", "-c", g.SetupStep.Command)
		if err := cmd.Start(); err != nil {
			return fmt.Errorf("failed to start setup step: %v", err)
		}
	}

	for i, step := range g.Steps {
		fmt.Printf("Step %d: %s\n", i+1, step.Name)

		output, err := step.Run()
		if err != nil {
			return fmt.Errorf("error in step %d (%s): %v", i+1, step.Name, err)
		}

		fmt.Printf("Output:\n%s\n", output)

		if err := step.CheckOutput(output); err != nil {
			return fmt.Errorf("output check failed for step %d (%s): %v", i+1, step.Name, err)
		}

		if err := step.RunCheck(); err != nil {
			return fmt.Errorf("additional check failed for step %d (%s): %v", i+1, step.Name, err)
		}

		fmt.Println("Step completed successfully")
	}

	fmt.Println("Guide completed successfully")
	return nil
}
