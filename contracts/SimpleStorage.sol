pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  mapping (address=>string []) public  data;
   struct filedata
   {
        string title;
        string val;
   }
   struct Dk
   {
    string pdata;
    address add ; 
   }
   mapping (address=>filedata []) public  fdata;

   Dk[] public people;
   
  function private_set(string memory x) public {
    data[msg.sender].push(x);
  }

  function file_set(string memory x,string memory y) public {
    // address y=msg.sender;
    fdata[msg.sender].push(filedata(x,y));
  }

  function public_set(string memory x) public {
    address y=msg.sender;
    people.push(Dk(x,y));
  }

  function public_length_get() public view returns (uint) {
    return people.length;
  }

  function private_length_get() public view returns (uint) {
    return data[msg.sender].length;
  }
  function file_private_length_get() public view returns (uint) {
    return fdata[msg.sender].length;
  }
}