use anchor_lang::prelude::*;

use crate::state::*;

#[derive(Accounts)]
#[instruction(item_id: u64)]
pub struct SubmitRecoveryClaim<'info> {
    #[account(mut)]
    pub finder: Signer<'info>,

    #[account(
        mut,
        constraint = lost_item.status == ItemStatus::Open
    )]
    pub lost_item: Account<'info, LostItem>,

    #[account(
        init,
        payer = finder,
        space = 8 + RecoveryClaim::INIT_SPACE,
        seeds = [b"claim", lost_item.key().as_ref()],
        bump
    )]
    pub claim: Account<'info, RecoveryClaim>,
    pub system_program: Program<'info, System>
}

pub fn handler(
    ctx: Context<SubmitRecoveryClaim>,
    image_url: String,
    found_location: String,
    message: String
) -> Result<()> {
    // require!(
    //     image_url.len() <= 200
    // );

    let claim = &mut ctx.accounts.claim;
    claim.lost_item = ctx.accounts.lost_item.key();
    claim.finder = ctx.accounts.finder.key();
    claim.image_url = image_url;
    claim.found_location = found_location;
    claim.message = message;
    claim.created_at = Clock::get()?.unix_timestamp;
    claim.bump = ctx.bumps.claim;

    ctx.accounts.lost_item.status = ItemStatus::ClaimSubmitted;

    Ok(())
}
