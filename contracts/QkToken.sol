pragma solidity >=0.6.2;

contract QkToken {
    string  public name = "Qkee Token";
    string  public symbol = "QK";
    string  public standard = "Qkee Token v1.0";
    uint256 public totalSupply;
    address public owner;
    address payable amount;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

     constructor(uint256 _initialSupply) public {
        owner = msg.sender;
        amount = msg.sender;
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public payable returns (bool success) {
        require(balanceOf[owner] >= _value);

        amount.transfer(msg.value);
        balanceOf[owner] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(owner, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(approve(_from,_value));
         
        uint256 forOwner = _value-5; 

        balanceOf[_from] -= _value;
        balanceOf[_to] += forOwner;

        balanceOf[owner] += 5;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}