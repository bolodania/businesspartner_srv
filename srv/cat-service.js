const cds = require('@sap/cds');

module.exports = (srv) => {
    const { BusinessPartnerDetails, AddressDetails, EmailAddressDetails } = cds.entities('PostBusinessPartnerDetailsService');

    srv.on('CREATE', 'BusinessPartnerDetails', async (req) => {
        const { business_partner, addresses, ...bpData } = req.data;

        // Check if BusinessPartner already exists
        let bp = await SELECT.one(BusinessPartnerDetails).where({ business_partner });

        if (bp) {
            console.log('update');
            await UPDATE(BusinessPartnerDetails, business_partner).with(bpData);

            // Handle Addresses and Email Addresses
            if (addresses && addresses.length > 0) {
                for (let address of addresses) {
                    // Check if Address already exists by address_id
                    let existingAddress = await SELECT.one(AddressDetails).where({ address_id: address.address_id });

                    if (existingAddress) {
                        console.log('Address exists, updating address');
                        await UPDATE(AddressDetails).set(address).where({ address_id: existingAddress.address_id });

                        // Fetch the updated address_id
                        const updatedAddress = await SELECT.one(AddressDetails).where({ address_id: existingAddress.address_id });

                        if (address.email_addresses && address.email_addresses.length > 0) {
                            // Handle email addresses for the updated address
                            for (let email of address.email_addresses) {
                                // Check if the email already exists for this address
                                let existingEmail = await SELECT.one(EmailAddressDetails).where({ address_id: updatedAddress.address_id, email_address: email.email_address });

                                if (existingEmail) {
                                    // If the email exists, update it
                                    console.log('Email exists, updating email');
                                    await UPDATE(EmailAddressDetails).set(email).where({ email_id: existingEmail.email_id });
                                } else {
                                    // If the email does not exist, insert it
                                    email.address_id = updatedAddress.address_id; // Associate email with the updated address
                                    await INSERT.into(EmailAddressDetails).entries(email);
                                }
                            }
                        }
                    } else {
                        console.log('Address does not exist, inserting new address');
                        // Insert Address
                        await INSERT.into(AddressDetails).entries(address);

                        // Fetch the last inserted address_id
                        const newAddress = await SELECT.one(AddressDetails).where({ address_id: address.address_id });

                        if (address.email_addresses && address.email_addresses.length > 0) {
                            // Handle email addresses for the new address
                            for (let email of address.email_addresses) {
                                // Check if the email already exists for this new address
                                let existingEmail = await SELECT.one(EmailAddressDetails).where({ address_id: newAddress.address_id, email_address: email.email_address });

                                if (existingEmail) {
                                    // If the email exists, update it
                                    console.log('Email exists, updating email');
                                    await UPDATE(EmailAddressDetails).set(email).where({ email_id: existingEmail.email_id });
                                } else {
                                    // If the email does not exist, insert it
                                    email.address_id = newAddress.address_id; // Associate email with the new address
                                    await INSERT.into(EmailAddressDetails).entries(email);
                                }
                            }
                        }
                    }
                }
            }

            return SELECT.one(BusinessPartnerDetails).where({ business_partner });
        } else {
            console.log('post');
            await INSERT.into(BusinessPartnerDetails).entries(bpData);

            // Insert Addresses if present
            if (addresses && addresses.length > 0) {
                for (let address of addresses) {
                    // Check if Address already exists by address_id
                    let existingAddress = await SELECT.one(AddressDetails).where({ address_id: address.address_id });

                    if (existingAddress) {
                        console.log('Address exists, updating address');
                        await UPDATE(AddressDetails).set(address).where({ address_id: existingAddress.address_id });

                        // Fetch the updated address_id
                        const updatedAddress = await SELECT.one(AddressDetails).where({ address_id: existingAddress.address_id });

                        if (address.email_addresses && address.email_addresses.length > 0) {
                            // Handle email addresses for the updated address
                            for (let email of address.email_addresses) {
                                // Check if the email already exists for this address
                                let existingEmail = await SELECT.one(EmailAddressDetails).where({ address_id: updatedAddress.address_id, email_address: email.email_address });

                                if (existingEmail) {
                                    // If the email exists, update it
                                    console.log('Email exists, updating email');
                                    await UPDATE(EmailAddressDetails).set(email).where({ email_id: existingEmail.email_id });
                                } else {
                                    // If the email does not exist, insert it
                                    email.address_id = updatedAddress.address_id; // Associate email with the updated address
                                    await INSERT.into(EmailAddressDetails).entries(email);
                                }
                            }
                        }
                    } else {
                        console.log('Address does not exist, inserting new address');
                        // Insert Address
                        await INSERT.into(AddressDetails).entries(address);

                        // Fetch the last inserted address_id
                        const newAddress = await SELECT.one(AddressDetails).where({ address_id: address.address_id });

                        if (address.email_addresses && address.email_addresses.length > 0) {
                            // Handle email addresses for the new address
                            for (let email of address.email_addresses) {
                                // Check if the email already exists for this new address
                                let existingEmail = await SELECT.one(EmailAddressDetails).where({ address_id: newAddress.address_id, email_address: email.email_address });

                                if (existingEmail) {
                                    // If the email exists, update it
                                    console.log('Email exists, updating email');
                                    await UPDATE(EmailAddressDetails).set(email).where({ email_id: existingEmail.email_id });
                                } else {
                                    // If the email does not exist, insert it
                                    email.address_id = newAddress.address_id; // Associate email with the new address
                                    await INSERT.into(EmailAddressDetails).entries(email);
                                }
                            }
                        }
                    }
                }
            }

            return SELECT.one(BusinessPartnerDetails).where({ business_partner });
        }
    });
};
