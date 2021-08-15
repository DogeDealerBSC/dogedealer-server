pragma solidity 0.8.4;

contract test{
    
    event ReferralRewards(address indexed by, address indexed to, uint256 indexed amount, uint256 iterationDaily, uint256 iterationWeekly, uint256 iterationMonthly, int256 treePosition, bool converted);
    
    event ReferredBy(address indexed by, address indexed Referrer, uint256 iterationDaily, uint256 iterationWeekly, uint256 iterationMonthly);


    function setReferrer(address _referrer) public {
        // add the direct referrer to the user's payout tree

        // check if the referrer was referred through a tree of their own;
        // set payout tree accordingly if so
      
        
        emit ReferredBy(_referrer, msg.sender, 1, 1, 2);
    }
    
    function transfer()public{
        emit ReferralRewards(msg.sender,msg.sender,10000,1,1,1,1,true);
    }
}