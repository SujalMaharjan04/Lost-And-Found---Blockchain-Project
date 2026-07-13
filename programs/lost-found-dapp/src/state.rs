use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq, InitSpace, Debug)]
pub enum ItemStatus {
    Open,
    ClaimSubmitted,
    ReadyForPickUp,
    Completed,
    Cancelled

}

#[account]
#[derive(InitSpace)]
pub struct LostItem {
    //Wallet that creates the lost item and funds the rewards
    pub owner: Pubkey,
    //Wallet that finds the lost item and receives the rewards
    pub finder: Pubkey,
    pub item_id: u64,
    #[max_len(64)]
    pub title: String,
    #[max_len(280)]
    pub description: String,
    #[max_len(32)]
    pub category: String,
    #[max_len(100)]
    pub last_seen_location: String,
    #[max_len(200)]
    pub image_url: String,
    pub reward_lamports: u64,
    pub status: ItemStatus,
    pub created_at: i64,
    pub bump: u8

}

#[account]
#[derive(InitSpace)]
pub struct RecoveryClaim{
    //The lost item this claim is linked to 
    pub lost_item: Pubkey,
    pub finder: Pubkey,
    #[max_len(200)]
    pub image_url: String,
    #[max_len(100)] 
    pub found_location: String,
    #[max_len(280)]
    pub message: String,
    pub created_at: i64,
    pub bump: u8
}
