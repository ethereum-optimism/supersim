package artifact

import (
	"encoding/json"
	"fmt"
	"os"
)

type Artifact struct {
	Bytecode Bytecode
}

type Bytecode struct {
	Object string `json:"object"`
}

type artifactMarshaling struct {
	Bytecode Bytecode `json:"bytecode"`
}

func NewArtifact(artifactPath string) (*Artifact, error) {
	artifact := &Artifact{}
	if artifactPath != "" {
		if err := artifact.LoadArtifactFromFile(artifactPath); err != nil {
			return nil, fmt.Errorf("failed to load artifact: %w", err)
		}
	}
	return artifact, nil
}

func (a *Artifact) GetBytecode() *string {
	return &a.Bytecode.Object
}

func (a *Artifact) LoadArtifactFromFile(filePath string) error {
	if filePath == "" {
		return fmt.Errorf("artifact file path not specified")
	}

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return fmt.Errorf("artifact file not found at %s", filePath)
	}

	data, err := os.ReadFile(filePath)
	if err != nil {
		return fmt.Errorf("failed to read artifact file: %w", err)
	}

	artifact := artifactMarshaling{}
	if err := json.Unmarshal(data, &artifact); err != nil {
		return fmt.Errorf("failed to parse artifact file: %w", err)
	}

	a.Bytecode = artifact.Bytecode
	return nil
}
