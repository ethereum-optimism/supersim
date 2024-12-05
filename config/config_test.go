package config

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/urfave/cli/v2"
)

func TestReadCLIConfig(t *testing.T) {
	cwd, err := os.Getwd()
	if err != nil {
		t.Fatalf("unable to determine executable path: %v", err)
	}

	cfgPath := filepath.Join(cwd, "config.toml")

	tomlContent := `
		admin_port = 8420
		l1_port = 8545
		l2_starting_port = 9545
		interop_autorelay = true
		interop_delay = 0
		logs_directory = "/var/logs"
		l1_host = "127.0.0.1"
		l2_host = "127.0.0.1"
	`

	tmpFile, err := os.Create(cfgPath)
	if err != nil {
		t.Fatalf("failed to create config.toml file: %v", err)
	}
	defer os.Remove(cfgPath)

	if _, err := tmpFile.WriteString(tomlContent); err != nil {
		t.Fatalf("failed to write to config.toml file: %v", err)
	}
	tmpFile.Close()

	ctx := cli.NewContext(nil, nil, nil)

	cfg, err := ReadCLIConfig(ctx)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if cfg.AdminPort != 8420 {
		t.Errorf("expected AdminPort to be 8420, got %d", cfg.AdminPort)
	}
	if cfg.L1Port != 8545 {
		t.Errorf("expected L1Port to be 8545, got %d", cfg.L1Port)
	}
	if cfg.L2StartingPort != 9545 {
		t.Errorf("expected L2StartingPort to be 9545, got %d", cfg.L2StartingPort)
	}
	if cfg.InteropAutoRelay != true {
		t.Errorf("expected InteropAutoRelay to be true, got %v", cfg.InteropAutoRelay)
	}
	if cfg.LogsDirectory != "/var/logs" {
		t.Errorf("expected LogsDirectory to be '/var/logs', got '%s'", cfg.LogsDirectory)
	}
	if cfg.L1Host != "127.0.0.1" {
		t.Errorf("expected L1Host to be '127.0.0.1', got '%s'", cfg.L1Host)
	}
	if cfg.L2Host != "127.0.0.1" {
		t.Errorf("expected L2Host to be '127.0.0.1', got '%s'", cfg.L2Host)
	}
}
