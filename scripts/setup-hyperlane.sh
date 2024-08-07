# hyperlane core deploy --chain l1 --yes --overrides ./hyperlane-registry
export HYP_KEY=0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6
hyperlane core deploy --chain opchaina --yes --overrides ./hyperlane-registry
hyperlane core deploy --chain opchainb --yes --overrides ./hyperlane-registry

hyperlane send