use anchor_lang::prelude::*;
use anchor_lang::system_program::{self, Transfer};

use crate::state::*;

#[derive(Accounts)]
#[instruction(item_id: u64)]
pub struct InitializeLostItem<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        init,
        payer = owner,
        space = 8 + LostItem::INIT_SPACE,
        seeds = [b"lost_item", owner.key().as_ref(), &item_id.to_le_bytes()],
        bump 
    )]
    pub lost_item: Account<'info, LostItem>,

    pub system_program: Program<'info, System>

}

pub fn handler(
    ctx: Context<InitializeLostItem>,
    item_id: u64,
    title: String,
    description: String,
    category: String,
    last_seen_location: String,
    image_url: String,
    reward_lamport: u64,
) -> Result<()> {
    let cpi_accounts  = Transfer {
        from: ctx.accounts.owner.to_account_info(),
        to: ctx.accounts.lost_item.to_account_info()
    };

    let cpi_ctx = CpiContext::new(ctx.accounts.system_program.to_account_info(), cpi_accounts);
    system_program::transfer(cpi_ctx, reward_lamport)?;

    let lost_item = &mut ctx.accounts.lost_item;
    lost_item.owner = ctx.accounts.owner.key();
    lost_item.finder = Pubkey::default();
    lost_item.item_id = item_id;
    lost_item.title = title;
    lost_item.description = description;
    lost_item.category = category;
    lost_item.last_seen_location = last_seen_location;
    lost_item.image_url = image_url;
    lost_item.reward_lamports = reward_lamport;
    lost_item.status = ItemStatus::Open;
    lost_item.created_at = Clock::get()?.unix_timestamp;
    lost_item.bump = ctx.bumps.lost_item;
    Ok(())
}