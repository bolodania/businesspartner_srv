const cds = require('@sap/cds');

module.exports = (srv) => {
    const { BusinessPartnerDetails, AddressDetails, EmailAddressDetails } = cds.entities('PostBusinessPartnerDetailsService');

    srv.on('CREATE', 'BusinessPartnerDetails', async (req) => {
        const { business_partner, addresses = [], ...bpData } = req.data;

        // Ensure business_partner is added back to bpData
        bpData.business_partner = business_partner;

        const existingBP = await SELECT.one(BusinessPartnerDetails).where({ business_partner });

        if (existingBP) {
            console.log('Business Partner exists — updating');
            await UPDATE(BusinessPartnerDetails, business_partner).with(bpData);
        } else {
            console.log('Business Partner does not exist — inserting');
            await INSERT.into(BusinessPartnerDetails).entries(bpData);
        }

        // Process addresses
        for (const address of addresses) {
            await upsertAddressAndEmails(business_partner, address);
        }

        return SELECT.one(BusinessPartnerDetails).where({ business_partner });
    });

    // 🔁 Reusable helper for Address & EmailAddress upsert
    async function upsertAddressAndEmails(bpId, address) {
        address.business_partner = bpId;

        const existingAddress = await SELECT.one(AddressDetails).where({ address_id: address.address_id });

        if (existingAddress) {
            console.log(`Updating Address: ${address.address_id}`);
            await UPDATE(AddressDetails).set(address).where({ address_id: address.address_id });
        } else {
            console.log(`Inserting Address: ${address.address_id}`);
            await INSERT.into(AddressDetails).entries(address);
        }

        // Process email addresses
        if (Array.isArray(address.email_addresses)) {
            for (const email of address.email_addresses) {
                await upsertEmailAddress(address.address_id, email);
            }
        }
    }

    async function upsertEmailAddress(addressId, email) {
        email.address_id = addressId;

        const existingEmail = await SELECT.one(EmailAddressDetails).where({
            address_id: addressId,
            email_address: email.email_address
        });

        if (existingEmail) {
            console.log(`Updating Email: ${email.email_address}`);
            await UPDATE(EmailAddressDetails).set(email).where({ email_id: existingEmail.email_id });
        } else {
            console.log(`Inserting Email: ${email.email_address}`);
            await INSERT.into(EmailAddressDetails).entries(email);
        }
    }
};
