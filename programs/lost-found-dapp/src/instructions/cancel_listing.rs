use anchor_lang::prelude::*;

use crate::state::*;

#[derive(Accounts)]
pub struct CancelListing<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        mut,
        has_one = owner,
        constraint = lost_item.status == ItemStatus::Open
    )]
    pub lost_item: Account<'info, LostItem>,
}

pub fn handler(ctx: Context<CancelListing>) -> Result<()> {
    let reward = ctx.accounts.lost_item.reward_lamports;

    let lost_item_info = ctx.accounts.lost_item.to_account_info();
    let owner_info = ctx.accounts.owner.to_account_info();

    **lost_item_info.try_borrow_mut_lamports()? -= reward;
    **owner_info.try_borrow_mut_lamports()? += reward;

    let lost_item = &mut ctx.accounts.lost_item;
    lost_item.reward_lamports = 0;
    lost_item.status = ItemStatus::Cancelled;

    Ok(())
}