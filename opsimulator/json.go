package opsimulator

import (
	"encoding/json"
	"fmt"
	"io"

	"github.com/ethereum/go-ethereum/rpc"
)

type jsonError struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// some parts copied over from op-geth as these are private

type jsonRpcMessage struct {
	Version string          `json:"jsonrpc,omitempty"`
	ID      json.RawMessage `json:"id,omitempty"`
	Method  string          `json:"method,omitempty"`
	Params  json.RawMessage `json:"params,omitempty"`
	Error   *jsonError      `json:"error,omitempty"`
	Result  json.RawMessage `json:"result,omitempty"`
}

const (
	vsn            = "2.0"
	errcodeDefault = -32000
	// Invalid method parameter(s).
	InvalidParams = -32602
	// Invalid JSON was received by the server.
	// An error occurred on the server while parsing the JSON text.
	ParseErr = -32700
)

var null = json.RawMessage("null")

func readJsonMessages(body io.Reader) ([]*jsonRpcMessage, bool, error) {
	var rawmsg json.RawMessage
	if err := json.NewDecoder(body).Decode(&rawmsg); err != nil {
		return nil, false, err
	}

	isBatch := isJsonRpcBatch(rawmsg)

	if !isBatch {
		msgs := []*jsonRpcMessage{{}}
		err := json.Unmarshal(rawmsg, &msgs[0])
		return msgs, isBatch, err
	}

	var msgs []*jsonRpcMessage
	err := json.Unmarshal(rawmsg, &msgs)
	return msgs, isBatch, err
}

// isBatch returns true when the first non-whitespace characters is '['
func isJsonRpcBatch(raw json.RawMessage) bool {
	for _, c := range raw {
		// skip insignificant whitespace (http://www.ietf.org/rfc/rfc4627.txt)
		if c == 0x20 || c == 0x09 || c == 0x0a || c == 0x0d {
			continue
		}
		return c == '['
	}
	return false
}

func errorMessage(err error) *jsonRpcMessage {
	msg := &jsonRpcMessage{Version: vsn, ID: null, Error: &jsonError{
		Code:    errcodeDefault,
		Message: err.Error(),
	}}
	ec, ok := err.(rpc.Error)
	if ok {
		msg.Error.Code = ec.ErrorCode()
	}
	de, ok := err.(rpc.DataError)
	if ok {
		msg.Error.Data = de.ErrorData()
	}
	return msg
}

func (err *jsonError) Error() string {
	if err.Message == "" {
		return fmt.Sprintf("json-rpc error %d", err.Code)
	}
	return err.Message
}

func (err *jsonError) ErrorCode() int {
	return err.Code
}

func (err *jsonError) ErrorData() interface{} {
	return err.Data
}
