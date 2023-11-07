import React, { useEffect, useState } from 'react'

const DeployContract = () => {
    const [contracts, setContracts] = useState(null)

    useEffect(()=>{
        fetchContracts()
    },[])

    const fetchContracts = () => {
        //replace with web3 code
        let contracts = [
            {address: '0xfds5f456df4d6s54f654', title: 'Sample title 1', description: 'sample description', amount: 99, platform_fee: 0.5, total_supply: 1000, existing_mint: 55}
        ]
        setContracts(contracts)
    }

    return (
        <div className='container text-start'>
            <h2 className='text-center my-4'>DEPLOY NEW CONTRACT</h2>
            <div className="row border border-success p-3">
                <table className='table'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Contract Address</td>
                            <td>Title</td>
                            <td>Description</td>
                            <td>Amount</td>
                            <td>Platform Fee</td>
                            <td>Total Allowed Mint</td>
                            <td>Existing Mint</td>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts && contracts.map((contract,i)=>(
                            <tr>
                                <td>{i+1}</td>
                                <td>{contract.address}</td>
                                <td>{contract.title}</td>
                                <td>{contract.description}</td>
                                <td>{contract.amount}</td>
                                <td>{contract.platform_fee}</td>
                                <td>{contract.total_supply}</td>
                                <td>{contract.existing_mint}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='border p-5 mt-3 bg-light'>
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label for="file1" className="form-label">Contract Icon</label>
                                <input type="file" className="form-control" id="file1"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label for="input1" className="form-label">Contract Title</label>
                                <input type="text" className="form-control" id="input1"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label for="input2" className="form-label">Contract Description</label>
                                <input type="text" className="form-control" id="input2"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label for="input3" className="form-label">Contract Amount</label>
                                <input type="number" className="form-control" id="input3"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label for="input4" className="form-label">Platform Fee</label>
                                <input type="number" className="form-control" id="input4"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label for="input5" className="form-label">Total Supply</label>
                                <input type="number" className="form-control" id="input5"/>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Deploy Contract</button>
                </form>
            </div>
        </div>
    )
}

export default DeployContract