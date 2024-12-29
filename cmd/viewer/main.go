package main

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"os/exec"
	"strings"
	"sync"
	"syscall"

	"github.com/jroimartin/gocui"
)

type CmdInfo struct {
	Label    string
	Name     string
	Output   []string
	Running  bool
	Finished bool
	Err      error

	Cmd  *exec.Cmd
	Pgid int
}

var commands = []*CmdInfo{
	{Label: "Supersim", Name: "go run cmd/main.go"},
	{Label: "L1 Chain", Name: "anvil --port 8545 > anvil-8545.log 2>&1 &"},
	{Label: "Decir Hola", Name: "echo 'Hola mundo!'"},
}

var selectedCommandIndex = 0
var mu sync.Mutex
var enableLogs = false

func main() {
	g, err := gocui.NewGui(gocui.OutputNormal)
	if err != nil {
		log.Panicln("[main] Error creando la GUI:", err)
	}
	defer g.Close()

	// layout
	g.SetManagerFunc(layout)

	// keybindings config
	if err := keybindings(g); err != nil {
		log.Panicln("[main] Error en keybindings:", err)
	}

	// main bucle
	if err := g.MainLoop(); err != nil && !errors.Is(err, gocui.ErrQuit) {
		log.Panicln("[main] Error en MainLoop:", err)
	}
}

func layout(g *gocui.Gui) error {
	maxX, maxY := g.Size()
	conditionalLog("[layout] Terminal size: %dx%d\n", maxX, maxY)

	// Process list (1/4 screen)
	if v, err := g.SetView("commands", 0, 0, maxX/4-1, maxY-1); err != nil {

		if errors.Is(err, gocui.ErrUnknownView) {
			conditionalLog("[layout] Creando vista 'commands' por primera vez")
			v.Title = "[Processes]"
			v.Highlight = true
			v.SelFgColor = gocui.ColorGreen
			printCommands(v)

			// initial focus
			if _, err := g.SetCurrentView("commands"); err != nil {
				conditionalLog("[layout] Error SetCurrentView('commands'): %v\n", err)
				return err
			}
			conditionalLog("[layout] Foco inicial en 'commands' (sólo esta vez)")
		} else {
			return err
		}
	}

	// Output view (3/4 screen)
	if v, err := g.SetView("output", maxX/4, 0, maxX-1, maxY-1); err != nil {
		if errors.Is(err, gocui.ErrUnknownView) {
			conditionalLog("[layout] Creando vista 'output' por primera vez")
			v.Title = "Terminal"
			v.Wrap = true
			updateOutputView(g, v)
		} else {
			return err
		}
	}

	return nil
}

func conditionalLog(format string, args ...interface{}) {
	if enableLogs {
		conditionalLog(format, args...)
	}
}

func printCommands(v *gocui.View) {
	conditionalLog("[printCommands] Redibujando lista. selectedCommandIndex=%d\n", selectedCommandIndex)
	v.Clear()
	for i, cmd := range commands {
		prefix := "   "
		if i == selectedCommandIndex {
			prefix = "-> "
		}
		status := ""
		switch {
		case cmd.Finished && cmd.Err != nil:
			status = " [ERROR]"
		case cmd.Finished:
			status = " [OK]"
		case cmd.Running:
			status = " [RUNNING]"
		}
		fmt.Fprintf(v, "%s%s%s\n", prefix, cmd.Label, status)
	}

	// move cursor to selected command
	if err := v.SetCursor(0, selectedCommandIndex); err != nil {
		conditionalLog("[printCommands] Error en SetCursor: %v\n", err)
	}
}

// keybindings navigation
func keybindings(g *gocui.Gui) error {
	conditionalLog("[keybindings] Configurando keybindings...")

	// Ctrl+C / Ctrl+Q to quit
	if err := g.SetKeybinding("", gocui.KeyCtrlC, gocui.ModNone, quit); err != nil {
		return err
	}
	if err := g.SetKeybinding("", gocui.KeyCtrlQ, gocui.ModNone, quit); err != nil {
		return err
	}

	//  ↑/↓ to navigate "commands" list
	if err := g.SetKeybinding("commands", gocui.KeyArrowUp, gocui.ModNone, cursorUpCommands); err != nil {
		return err
	}
	if err := g.SetKeybinding("commands", gocui.KeyArrowDown, gocui.ModNone, cursorDownCommands); err != nil {
		return err
	}

	// Tab , ←/→ to toggle focus between "commands" and "output"
	if err := g.SetKeybinding("", gocui.KeyTab, gocui.ModNone, toggleFocus); err != nil {
		return err
	}
	if err := g.SetKeybinding("commands", gocui.KeyArrowLeft, gocui.ModNone, focusOutput); err != nil {
		return err
	}
	if err := g.SetKeybinding("commands", gocui.KeyArrowRight, gocui.ModNone, focusOutput); err != nil {
		return err
	}

	// Intro in "commands" to launch selected command
	if err := g.SetKeybinding("commands", gocui.KeyEnter, gocui.ModNone, launchSelectedCommand); err != nil {
		return err
	}

	// ↑/↓ in "output" to scroll
	if err := g.SetKeybinding("output", gocui.KeyArrowUp, gocui.ModNone, scrollUpOutput); err != nil {
		return err
	}
	if err := g.SetKeybinding("output", gocui.KeyArrowDown, gocui.ModNone, scrollDownOutput); err != nil {
		return err
	}

	// ←/→ in output to focus commands
	if err := g.SetKeybinding("output", gocui.KeyArrowLeft, gocui.ModNone, focusCommands); err != nil {
		return err
	}
	if err := g.SetKeybinding("output", gocui.KeyArrowRight, gocui.ModNone, focusCommands); err != nil {
		return err
	}

	// PageUp/PageDown in output
	if err := g.SetKeybinding("output", gocui.KeyPgup, gocui.ModNone, scrollPageUpOutput); err != nil {
		return err
	}
	if err := g.SetKeybinding("output", gocui.KeyPgdn, gocui.ModNone, scrollPageDownOutput); err != nil {
		return err
	}

	return nil
}

func scrollUpOutput(g *gocui.Gui, v *gocui.View) error {
	ox, oy := v.Origin()
	if oy > 0 {
		v.SetOrigin(ox, oy-1)
	}
	return nil
}

func scrollDownOutput(g *gocui.Gui, v *gocui.View) error {
	ox, oy := v.Origin()
	v.SetOrigin(ox, oy+1)
	return nil
}

func scrollPageUpOutput(g *gocui.Gui, v *gocui.View) error {
	ox, oy := v.Origin()
	_, h := v.Size()
	newOy := oy - h/2
	if newOy < 0 {
		newOy = 0
	}
	v.SetOrigin(ox, newOy)
	return nil
}

func scrollPageDownOutput(g *gocui.Gui, v *gocui.View) error {
	ox, oy := v.Origin()
	_, h := v.Size()
	v.SetOrigin(ox, oy+h/2)
	return nil
}

func cursorUpCommands(g *gocui.Gui, v *gocui.View) error {
	conditionalLog("[cursorUpCommands] pressed ↑")
	if selectedCommandIndex > 0 {
		selectedCommandIndex--
		v.Clear()
		printCommands(v)
		updateOutput(g)
	}
	return nil
}

func cursorDownCommands(g *gocui.Gui, v *gocui.View) error {
	conditionalLog("[cursorDownCommands] pressed ↓")
	if selectedCommandIndex < len(commands)-1 {
		selectedCommandIndex++
		v.Clear()
		printCommands(v)
		updateOutput(g)
	}
	return nil
}

func focusCommands(g *gocui.Gui, v *gocui.View) error {
	conditionalLog("[focusCommands] Cambiando foco a 'commands'")
	if _, err := g.SetCurrentView("commands"); err != nil {
		conditionalLog("[focusCommands] Error SetCurrentView('commands'): %v\n", err)
		return err
	}
	co, err := g.View("commands")
	if err != nil {
		conditionalLog("[focusCommands] Error g.View('commands'): %v\n", err)
		return err
	}
	ou, err := g.View("output")
	if err != nil {
		conditionalLog("[focusCommands] Error g.View('output'): %v\n", err)
		return err
	}
	co.Title = "[Processes]"
	ou.Title = "Terminal"
	printCommands(co)
	return nil
}

func focusOutput(g *gocui.Gui, v *gocui.View) error {
	conditionalLog("[focusOutput] Cambiando foco a 'output'")
	if _, err := g.SetCurrentView("output"); err != nil {
		conditionalLog("[focusOutput] Error SetCurrentView('output'): %v\n", err)
		return err
	}
	co, err := g.View("commands")
	if err != nil {
		conditionalLog("[focusOutput] Error g.View('commands'): %v\n", err)
		return err
	}
	ou, err := g.View("output")
	if err != nil {
		conditionalLog("[focusOutput] Error g.View('output'): %v\n", err)
		return err
	}
	co.Title = "Processes"
	ou.Title = "[Terminal]"
	return nil
}

func toggleFocus(g *gocui.Gui, v *gocui.View) error {
	conditionalLog("[toggleFocus] pressed Tab")
	current := g.CurrentView()
	if current == nil {
		return nil
	}
	if current.Name() == "commands" {
		return focusOutput(g, v)
	}
	return focusCommands(g, v)
}

// launchSelectedCommand launches the selected command
func launchSelectedCommand(g *gocui.Gui, v *gocui.View) error {
	conditionalLog("[launchSelectedCommand] selectedCommandIndex=%d\n", selectedCommandIndex)
	cmdInfo := commands[selectedCommandIndex]
	if cmdInfo.Running {
		conditionalLog("[launchSelectedCommand] El comando ya está corriendo, no se relanza.")
		return nil
	}
	if cmdInfo.Finished {
		cmdInfo.Output = nil
		cmdInfo.Err = nil
		cmdInfo.Finished = false
		conditionalLog("[launchSelectedCommand] Reseteando estado de Output y Err, pues ya había finalizado")
	}
	cmdInfo.Running = true
	cmdInfo.Output = []string{}

	v.Clear()
	printCommands(v)

	// launch goroutine to run the command
	go func(index int, c *CmdInfo) {
		err := runCommand(g, index, c.Name)

		mu.Lock()
		c.Running = false
		c.Finished = true
		c.Err = err
		mu.Unlock()

		g.Update(func(gui *gocui.Gui) error {
			conditionalLog("[launchSelectedCommand/goroutine] Proceso %s finalizado. selectedIndex=%d\n", c.Name, selectedCommandIndex)
			cv, _ := gui.View("commands")
			cv.Clear()
			printCommands(cv)

			if index == selectedCommandIndex {
				updateOutput(gui)
			}
			return nil
		})
	}(selectedCommandIndex, cmdInfo)

	return nil
}

// runCommand creates a *exec.Cmd, launches it and reads stdout/err
func runCommand(g *gocui.Gui, cmdIndex int, fullCmd string) error {
	conditionalLog("[runCommand] Iniciando comando real: %q\n", fullCmd)
	parts := strings.Fields(fullCmd)
	if len(parts) == 0 {
		return fmt.Errorf("comando vacío")
	}

	cmd := exec.Command(parts[0], parts[1:]...)
	cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}

	mu.Lock()
	commands[cmdIndex].Cmd = cmd
	mu.Unlock()

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return err
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		return err
	}

	if err := cmd.Start(); err != nil {
		return err
	}

	mu.Lock()
	commands[cmdIndex].Pgid = cmd.Process.Pid
	mu.Unlock()

	go readLines(g, cmdIndex, stdout, false)
	go readLines(g, cmdIndex, stderr, true)

	return cmd.Wait()
}

// readLines reads from a reader and appends to the output
func readLines(g *gocui.Gui, cmdIndex int, reader interface{}, isErr bool) {
	r, ok := reader.(interface {
		Read([]byte) (int, error)
		Close() error
	})
	if !ok {
		conditionalLog("[readLines] Error: no se pudo hacer cast a io.Reader")
		return
	}
	scanner := bufio.NewScanner(r)

	for scanner.Scan() {
		raw := scanner.Text()
		// format \n
		raw = strings.ReplaceAll(raw, `\n`, "\n")
		// Split into lines
		sublines := strings.Split(raw, "\n")

		for _, sub := range sublines {
			sub = strings.TrimSuffix(sub, "\r")

			if isErr {
				sub = "[ERR] " + sub
			}

			mu.Lock()
			commands[cmdIndex].Output = append(commands[cmdIndex].Output, sub)
			mu.Unlock()

			// update output view if this is the selected command
			g.Update(func(gui *gocui.Gui) error {
				if cmdIndex == selectedCommandIndex {
					v, err := gui.View("output")
					if err == nil {
						updateOutputView(gui, v)
					}
				}
				return nil
			})
		}
	}
	if err := scanner.Err(); err != nil {
		mu.Lock()
		commands[cmdIndex].Output = append(commands[cmdIndex].Output,
			fmt.Sprintf("[ERR] leyendo Terminal: %v", err))
		mu.Unlock()
	}
}

func updateOutput(g *gocui.Gui) {
	v, err := g.View("output")
	if err != nil {
		conditionalLog("[updateOutput] Error View('output'): %v\n", err)
		return
	}
	updateOutputView(g, v)
}

func updateOutputView(g *gocui.Gui, v *gocui.View) {
	mu.Lock()
	defer mu.Unlock()

	conditionalLog("[updateOutputView] Redibujando la Terminal de index=%d\n", selectedCommandIndex)
	v.SetOrigin(0, 0)
	v.Clear()

	outLines := commands[selectedCommandIndex].Output
	if len(outLines) == 0 {
		fmt.Fprintln(v, "To start a process, select it and press Enter")
		return
	}
	for _, line := range outLines {
		fmt.Fprintln(v, line)
	}
}

func quit(g *gocui.Gui, v *gocui.View) error {
	conditionalLog("[quit] Terminando la TUI y matando subprocesos si los hay...")
	for _, c := range commands {
		if c.Running && c.Cmd != nil && c.Cmd.Process != nil && c.Pgid != 0 {
			conditionalLog("[quit] Matando proceso con PGID %d\n", c.Pgid)
			_ = syscall.Kill(-c.Pgid, syscall.SIGKILL)
		}
	}
	return gocui.ErrQuit
}
