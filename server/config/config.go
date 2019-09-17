package config

import (
	"github.com/Mexx77/ridesharing/logging"
	"os"
)

var config *Config

// env var constants
const environment 		= "ENVIRONMENT"
const mongoPw 			= "MONGO_PW"
const DevEnvironment 	= "dev"

type Config struct {
	Environment string
	MongoPw string
}

func GetConfig() *Config {
	if config == nil{
		return &Config{
			Environment: getConfigString(environment, true),
			MongoPw: getConfigString(mongoPw, false),
		}
	} else {
		return config
	}
}

func getConfigString(envVar string, print bool) string {
	entry := os.Getenv(envVar)
	if entry == "" {
		logging.Error.Print("Please configure " + envVar)
		os.Exit(1)
	}
	if print {
		logging.Info.Print(envVar+": ", entry)
	} else {
		logging.Info.Print(envVar+": ******")
	}
	return entry
}
