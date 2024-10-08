package main

import (
	"fmt"
	"log"
	"os"

	oplog "github.com/ethereum-optimism/optimism/op-service/log"
	"github.com/ethereum-optimism/supersim/guidegen"
	"github.com/urfave/cli/v2"
	"gopkg.in/yaml.v2"
)

func main() {
	oplog.SetupDefaults()

	app := cli.NewApp()
	app.Name = "supersim-guidegen"
	app.Usage = "Supersim Guide Generator"
	app.Description = "Generate and check guides for supersim"

	app.Commands = []*cli.Command{
		{
			Name:  "generate",
			Usage: "Generate a guide from a YAML file",
			Action: func(c *cli.Context) error {
				if c.NArg() < 1 {
					return fmt.Errorf("please provide a YAML file path")
				}
				return generateGuide(c.Args().First())
			},
		},
		{
			Name:  "check",
			Usage: "Execute and check a guide from a YAML file",
			Action: func(c *cli.Context) error {
				if c.NArg() < 1 {
					return fmt.Errorf("please provide a YAML file path")
				}
				return checkGuide(c.Args().First())
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

func generateGuide(filePath string) error {
	guide, err := loadGuide(filePath)
	if err != nil {
		return err
	}

	renderedGuide, err := guide.Render()
	if err != nil {
		return err
	}

	fmt.Println(renderedGuide)
	return nil
}

func checkGuide(filePath string) error {
	guide, err := loadGuide(filePath)
	if err != nil {
		return err
	}

	return guide.Run()
}

func loadGuide(filePath string) (guidegen.Guide, error) {
	var guide guidegen.Guide

	data, err := os.ReadFile(filePath)
	if err != nil {
		return guide, fmt.Errorf("error reading file: %v", err)
	}

	err = yaml.Unmarshal(data, &guide)
	if err != nil {
		return guide, fmt.Errorf("error unmarshaling YAML: %v", err)
	}

	return guide, nil
}
