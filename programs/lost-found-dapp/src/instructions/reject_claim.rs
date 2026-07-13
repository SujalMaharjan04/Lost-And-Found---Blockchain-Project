use anchor_lang::prelude::*;

use crate::state::*;

#[derive(Accounts)]
pub struct RejectClaim<'info> {
    pub owner: Signer<'info>,

    #[account(
        mut,
        has_one = owner,
        constraint = lost_item.status == ItemStatus::ClaimSubmitted
    )]
    pub lost_item: Account<'info, LostItem>,

    #[account(
        mut,
        address = claim.finder 
    )]
    pub finder: SystemAccount<'info>,

    #[account(
        mut,
        close = finder,
        seeds = [b"claim", lost_item.key().as_ref()],
        bump = claim.bump,
        constraint = claim.lost_item == lost_item.key()
    )]
    pub claim: Account<'info, RecoveryClaim>
}

pub fn handler(ctx: Context<RejectClaim>) -> Result<()> {
    let lost_item = &mut ctx.accounts.lost_item;
    lost_item.status = ItemStatus::Open;
    lost_item.finder = Pubkey::default();
    Ok(())
}

