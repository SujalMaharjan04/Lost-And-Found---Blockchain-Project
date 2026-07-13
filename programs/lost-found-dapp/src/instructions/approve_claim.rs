use anchor_lang::prelude::*;

use crate::state::*;

#[derive(Accounts)]
pub struct ApproveClaim<'info> {
    pub owner: Signer<'info>,

    #[account(
        mut,
        has_one = owner,
        constraint = lost_item.status == ItemStatus::ClaimSubmitted
    )]
    pub lost_item: Account<'info, LostItem>,

    #[account(
        seeds = [b"claim", lost_item.key().as_ref()],
        bump = claim.bump,
        constraint = claim.lost_item == lost_item.key(),
    )]
    pub claim: Account<'info, RecoveryClaim>
}

pub fn handler(ctx: Context<ApproveClaim>) -> Result<()> {
    let lost_item = &mut ctx.accounts.lost_item;
    lost_item.finder = ctx.accounts.claim.finder;
    lost_item.status = ItemStatus::ReadyForPickUp;
    Ok(())
}