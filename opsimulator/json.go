package opsimulator

import (
	"encoding/json"
	"io"
)

// some parts copied over from op-geth as these are private

type jsonRpcMessage struct {
	Version string          `json:"jsonrpc,omitempty"`
	ID      json.RawMessage `json:"id,omitempty"`
	Method  string          `json:"method,omitempty"`
	Params  json.RawMessage `json:"params,omitempty"`

	// Since we're just proxying back the response,
	// no need to include the Error/Result fields
}

func readJsonMessages(body io.Reader) ([]*jsonRpcMessage, error) {
	var rawmsg json.RawMessage
	if err := json.NewDecoder(body).Decode(&rawmsg); err != nil {
		return nil, err
	}

	if !isJsonRpcBatch(rawmsg) {
		msgs := []*jsonRpcMessage{{}}
		err := json.Unmarshal(rawmsg, &msgs[0])
		return msgs, err
	}

	var msgs []*jsonRpcMessage
	err := json.Unmarshal(rawmsg, &msgs)
	return msgs, err
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
