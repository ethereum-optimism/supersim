package accountabstraction

import (
	"errors"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-logr/logr"
)

// WithLogr uses a logger with the go-logr/logr interface to log a gin HTTP request.
func WithLogr(logger logr.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {

		start := time.Now() // Start timer
		path := c.Request.URL.Path
		raw := c.Request.URL.RawQuery

		// Process request
		c.Next()

		// Fill the params
		param := gin.LogFormatterParams{}

		param.TimeStamp = time.Now() // Stop timer
		param.Latency = param.TimeStamp.Sub(start)
		if param.Latency > time.Minute {
			param.Latency = param.Latency.Truncate(time.Second)
		}

		param.Method = c.Request.Method
		param.StatusCode = c.Writer.Status()
		param.ErrorMessage = c.Errors.ByType(gin.ErrorTypePrivate).String()
		param.BodySize = c.Writer.Size()
		if raw != "" {
			path = path + "?" + raw
		}
		param.Path = path

		logEvent := logger.WithName("http").
			WithValues("method", param.Method).
			WithValues("status_code", param.StatusCode).
			WithValues("body_size", param.BodySize).
			WithValues("path", param.Path).
			WithValues("latency", param.Latency.String())

		req, exists := c.Get("json-rpc-request")
		if exists {
			json := req.(map[string]any)
			logEvent = logEvent.WithValues("rpc_method", json["method"])
		}

		// Log using the params
		if c.Writer.Status() >= 500 {
			logEvent.Error(errors.New(param.ErrorMessage), param.ErrorMessage)
		} else {
			logEvent.Info(param.ErrorMessage)
		}
	}
}
