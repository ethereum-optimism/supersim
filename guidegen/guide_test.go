package guidegen

import (
	_ "embed"
	"strings"
	"testing"

	"gopkg.in/yaml.v2"
)

//go:embed guides/l1-to-l2-deposit.yaml
var guideFS string

func TestGuideRender(t *testing.T) {
	// Parse YAML into Guide struct
	var guide Guide
	if err := yaml.Unmarshal([]byte(guideFS), &guide); err != nil {
		t.Fatalf("Failed to unmarshal YAML: %v", err)
	}

	// Render the guide
	renderedGuide, err := guide.Render()
	if err != nil {
		t.Fatalf("Failed to render guide: %v", err)
	}

	// Print the rendered guide (for visual inspection)
	t.Logf("Rendered Guide:\n%s", renderedGuide)

	// Add assertions to check the rendered content
	expectedSubstrings := []string{
		"## 🔀 Example A: (L1 to L2) Deposit ETH from the L1 into the L2",
		"**2. Check initial balance on the L2 (chain 901)**",
		"**3. Call `bridgeETH` function on the `L1StandardBridgeProxy` contract on the L1 (chain 900)**",
		"**4. Check the balance on the L2 (chain 901)**",
		"```sh",
		"cast balance 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:9545",
	}

	for _, substr := range expectedSubstrings {
		if !strings.Contains(renderedGuide, substr) {
			t.Errorf("Expected substring not found in rendered guide: %s", substr)
		}
	}
}

func TestGuideRun(t *testing.T) {
	guide := Guide{
		Title:       "Test Guide",
		Description: "A simple guide for testing",
		Steps: []Step{
			{
				Name:           "Echo Hello",
				Description:    "Print Hello to the console",
				Command:        "echo Hello",
				ExpectedOutput: "Hello",
			},
			{
				Name:        "Create a file",
				Description: "Create a file named test.txt",
				Command:     "touch test.txt",
				Check: &Check{
					Command: "ls test.txt",
					Output:  "test.txt",
				},
			},
		},
	}

	err := guide.Run()
	if err != nil {
		t.Errorf("Guide.Run() error = %v", err)
	}
}
