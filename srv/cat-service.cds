using BusinessPartnerService from '../db/schema';

service ReadBusinessPartnerDetailsService @(path: '/read-bp-details') {
    @readonly
    entity BusinessPartnerDetails as projection on BusinessPartnerService.BusinessPartner;
    entity AddressDetails as projection on BusinessPartnerService.Address;
    entity EmailAddressDetails as projection on BusinessPartnerService.EmailAddress;
}

service PostBusinessPartnerDetailsService @(path: '/post-bp-details') {
    @insertonly
    entity BusinessPartnerDetails as projection on BusinessPartnerService.BusinessPartner;
    entity AddressDetails as projection on BusinessPartnerService.Address;
    entity EmailAddressDetails as projection on BusinessPartnerService.EmailAddress;
}
