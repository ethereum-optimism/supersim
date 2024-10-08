package worldgen

import (
	"fmt"
	"net/url"
	"os"
	"strings"

	"path/filepath"

	"github.com/urfave/cli/v2"
)

func cwd() string {
	dir, err := os.Getwd()
	if err != nil {
		return ""
	}
	return dir
}

const (
	MonorepoArtifactsUrlFlag  = "monorepo-artifacts"
	PeripheryArtifactsUrlFlag = "periphery-artifacts"
	OutDirFlag                = "outdir"
)

func CLIFlags() []cli.Flag {
	return []cli.Flag{
		&cli.StringFlag{
			Name:     MonorepoArtifactsUrlFlag,
			Usage:    "URL to the monorepo artifacts, can be https:// or a fs path",
			Required: true,
		},
		&cli.StringFlag{
			Name:     PeripheryArtifactsUrlFlag,
			Usage:    "URL to the periphery artifacts, can be https:// or a fs path",
			Required: true,
		},
		&cli.StringFlag{
			Name:  OutDirFlag,
			Usage: "Directory to output the genesis files",
			Value: cwd(),
		},
	}
}

type CLIConfig struct {
	MonorepoArtifactsURL  *url.URL
	PeripheryArtifactsURL *url.URL
	Outdir                string
}

func ParseCLIConfig(ctx *cli.Context) (*CLIConfig, error) {
	monorepoArtifacts := ctx.String(MonorepoArtifactsUrlFlag)
	peripheryArtifacts := ctx.String(PeripheryArtifactsUrlFlag)
	outDir := ctx.String(OutDirFlag)

	monorepoArtifactsURL, err := parseLocalPathOrURL(monorepoArtifacts)
	if err != nil {
		return nil, fmt.Errorf("failed to parse monorepo artifacts url: %w", err)
	}

	peripheryArtifactsURL, err := parseLocalPathOrURL(peripheryArtifacts)
	if err != nil {
		return nil, fmt.Errorf("failed to parse periphery artifacts url: %w", err)
	}

	return &CLIConfig{
		MonorepoArtifactsURL:  monorepoArtifactsURL,
		PeripheryArtifactsURL: peripheryArtifactsURL,
		Outdir:                outDir,
	}, nil
}

func parseLocalPathOrURL(localPathOrUrl string) (*url.URL, error) {
	if localPathOrUrl == "" {
		return nil, fmt.Errorf("local path or url is required")
	}

	if strings.HasPrefix(localPathOrUrl, "https://") || strings.HasPrefix(localPathOrUrl, "http://") || strings.HasPrefix(localPathOrUrl, "file://") {
		return url.Parse(localPathOrUrl)
	}

	absPath, err := filepath.Abs(localPathOrUrl)
	if err != nil {
		return nil, fmt.Errorf("failed to get absolute path for %s: %w", localPathOrUrl, err)
	}

	return url.Parse(fmt.Sprintf("file://%s", absPath))
}
