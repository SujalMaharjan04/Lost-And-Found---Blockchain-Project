use anchor_lang::prelude::*;

pub mod state;
pub mod instructions;

use instructions::*;

declare_id!("3wH477PFXiqmei2cvxZiTrLescHPZ5xp5AUuPhP6eFJc");

#[program]
pub mod lost_found_dapp {
    use super::*;

    pub fn initialize_lost_item(
        ctx: Context<InitializeLostItem>,
        item_id: u64,
        title: String,
        description: String,
        category: String,
        last_seen_location: String,
        image_url: String,
        reward_lamport: u64,
    ) -> Result<()> {
        instructions::initialize_lost_item::handler(
            ctx,
            item_id,
            title,
            description,
            category,
            last_seen_location,
            image_url,
            reward_lamport,
        )
    }

    pub fn submit_recovery_claim(
        ctx: Context<SubmitRecoveryClaim>,
        image_url: String,
        found_location: String,
        message: String,
    ) -> Result<()> {
        instructions::submit_recovery_claim::handler(
            ctx, 
            image_url,
            found_location,
            message
        )
    }

    pub fn approve_claim(ctx: Context<ApproveClaim>) -> Result<()> {
        instructions::approve_claim::handler(
            ctx
        )
    }

    pub fn reject_claim(ctx: Context<RejectClaim>) -> Result<()> {
        instructions::reject_claim::handler(ctx)
    }

    pub fn confirm_received(ctx: Context<ComfirmReceived>) -> Result<()> {
        instructions::confirm_received::handler(ctx)
    }

    pub fn cancel_listing(ctx: Context<CancelListing>) -> Result<()> {
        instructions::cancel_listing::handler(ctx)
    }
}



