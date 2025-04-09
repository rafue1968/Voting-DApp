import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "./contractAddress";
import { abi } from "./contractABI";

function App(){
    const [options, setOptions]= useState([]);
    const [votes, setVotes]= useState({});
    const [selected, setSelected] = useState("");

    useEffect(() => {
        const load = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const opts = await contract.getOptions();
            setOptions(opts);

            const votesData = {};
            for (let opt of opts){
                const count = await contract.getVotes(opt);
                votesData[opt] = count.toString();
            }
            setVotes(votesData);
        };

        load();
    }, []);

    const vote = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        await contract.vote(selected);
        alert(`You voted for ${selected}. Please refresh to see updated votes.`);
    };

    return (
        <div style={{padding: "2rem", fontFamily: "sans-serif"}}>
            <h1>Voting DApp</h1>

            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="">--Choose an option--</option>
                {options.map((opt) => (
                    <option value={opt} key={opt}>
                        {opt}
                    </option>
                ))}
            </select>

            <button onClick={vote} disabled={!selected} style={{marginLeft: "1rem"}}>
                Vote
            </button>

            <h2 style={{marginTop: "2rem"}}>Current Votes</h2>
            <ul>
                {Object.entries(votes).map(([opt, count])=> (
                    <li key={opt}>
                        {opt}: {count}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App;