package hdaccount

import (
	"crypto/ecdsa"
	"errors"

	"github.com/btcsuite/btcd/btcutil/hdkeychain"
	"github.com/btcsuite/btcd/chaincfg"
	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"

	"github.com/tyler-smith/go-bip39"
)

type HdAccountStore struct {
	mnemonic  string
	basePath  accounts.DerivationPath
	seed      []byte
	masterKey *hdkeychain.ExtendedKey
}

func NewHdAccountStore(mnemonic string, basePath accounts.DerivationPath) (*HdAccountStore, error) {
	if mnemonic == "" {
		return nil, errors.New("mnemonic is required")
	}

	if !bip39.IsMnemonicValid(mnemonic) {
		return nil, errors.New("mnemonic is invalid")
	}

	seed, err := bip39.NewSeedWithErrorChecking(mnemonic, "")
	if err != nil {
		return nil, err
	}

	masterKey, err := hdkeychain.NewMaster(seed, &chaincfg.MainNetParams)
	if err != nil {
		return nil, err
	}

	return &HdAccountStore{mnemonic: mnemonic, basePath: basePath, seed: seed, masterKey: masterKey}, nil
}

func (h *HdAccountStore) DerivePrivateKeyAt(index uint32) (*ecdsa.PrivateKey, error) {

	var key *hdkeychain.ExtendedKey
	key = h.masterKey
	for _, n := range h.derivationPathForIndex(index) {
		derivedKey, err := key.Derive(n)

		if err != nil {
			return nil, err
		}

		key = derivedKey
	}

	privateKey, err := key.ECPrivKey()
	privateKeyECDSA := privateKey.ToECDSA()
	if err != nil {
		return nil, err
	}

	return privateKeyECDSA, nil
}

func (h *HdAccountStore) DerivePublicKeyAt(index uint32) (*ecdsa.PublicKey, error) {
	privateKeyECDSA, err := h.DerivePrivateKeyAt(index)
	if err != nil {
		return nil, err
	}

	publicKey := privateKeyECDSA.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		return nil, errors.New("failed to get public key")
	}

	return publicKeyECDSA, nil
}

func (h *HdAccountStore) PrivateKeyHexAt(index uint32) (string, error) {
	privateKey, err := h.DerivePrivateKeyAt(index)
	if err != nil {
		return "", err
	}

	return hexutil.Encode(crypto.FromECDSA(privateKey)), nil
}

func (h *HdAccountStore) AddressHexAt(index uint32) (string, error) {
	publicKey, err := h.DerivePublicKeyAt(index)
	if err != nil {
		return "", err
	}

	address := crypto.PubkeyToAddress(*publicKey)

	return address.Hex(), nil
}

func (h *HdAccountStore) derivationPathForIndex(index uint32) accounts.DerivationPath {
	return accounts.DerivationPath(append(h.basePath, index))
}
