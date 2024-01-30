//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract DataStorage_gNb1 {
    struct Data {
        string crnti;
    }

    mapping(uint => Data) public dataStore;

    function storeData(uint _ue_id, string memory _crnti) public {
        dataStore[_ue_id] = Data(_crnti);
    }

}
