use anchor_lang::prelude::*;

use crate::state::*;

#[derive(Accounts)]
pub struct ComfirmReceived<'info> {
    pub owner: Signer<'info>,

    #[account(
        mut,
        has_one = owner,
        constraint = lost_item.status == ItemStatus::ReadyForPickUp
    )]
    pub lost_item: Account<'info, LostItem>,

    #[account(
        mut,
        address = lost_item.finder
    )]
    pub finder: SystemAccount<'info>,

    #[account(
        mut,
        close = finder,
        seeds = [b"claim", lost_item.key().as_ref()],
        bump = claim.bump,
        constraint = claim.lost_item == lost_item.key()
    )]
    pub claim: Account<'info, RecoveryClaim>,
}

pub fn handler(ctx: Context<ComfirmReceived>) -> Result<()> {
    let reward = ctx.accounts.lost_item.reward_lamports;

    let lost_item_info = ctx.accounts.lost_item.to_account_info();

    **lost_item_info.try_borrow_mut_lamports()? -= reward;
    **ctx.accounts.finder.to_account_info().try_borrow_mut_lamports()? += reward;

    let lost_item = &mut ctx.accounts.lost_item;
    lost_item.reward_lamports = 0;
    lost_item.status = ItemStatus::Completed;

    Ok(())


}