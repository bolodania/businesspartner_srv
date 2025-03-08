namespace BusinessPartnerService;


entity BusinessPartner {
    key business_partner                  : String(50)  @title: 'Business Partner ID';
        first_name                        : String(100) @title: 'First Name';
        middle_name                       : String(100) @title: 'Middle Name';
        last_name                         : String(100) @title: 'Last Name';
        full_name                         : String(200) @title: 'Full Name';
        gender_code                       : String(10)  @title: 'Gender Code';
        birth_date                        : DateTime    @title: 'Birth Date';
        birthplace_name                   : String(200) @title: 'Birthplace Name';
        nationality                       : String(10)  @title: 'Nationality';
        marital_status                    : String(10)  @title: 'Marital Status';
        correspondence_language           : String(10)  @title: 'Correspondence Language';
        search_term_1                     : String(100) @title: 'Search Term 1';
        search_term_2                     : String(100) @title: 'Search Term 2';
        business_partner_occupation       : String(200) @title: 'Business Partner Occupation';
        creation_date                     : DateTime    @title: 'Creation Date';
        creation_time                     : DateTime    @title: 'Creation Time';
        created_by_user                   : String(50)  @title: 'Created By User';
        last_change_date                  : DateTime    @title: 'Last Change Date';
        last_change_time                  : DateTime    @title: 'Last Change Time';
        last_changed_by_user              : String(50)  @title: 'Last Changed By User';
        addresses                         : Association to many Address
                                                on addresses.business_partner = business_partner;
}

entity Address {
    key address_id          : String(50)  @title: 'Address ID';
        business_partner    : String(50)  @title: 'Business Partner ID';
        street_name         : String(200) @title: 'Street Name';
        house_number        : String(50)  @title: 'House Number';
        city_name           : String(100) @title: 'City Name';
        postal_code         : String(50)  @title: 'Postal Code';
        country             : String(10)  @title: 'Country';
        region              : String(50)  @title: 'Region';
        district            : String(100) @title: 'District';
        county              : String(100) @title: 'County';
        township_name       : String(100) @title: 'Township Name';
        township_code       : String(50)  @title: 'Township Code';
        address_time_zone   : String(10)  @title: 'Address Time Zone';
        validity_start_date : DateTime    @title: 'Validity Start Date';
        validity_end_date   : DateTime    @title: 'Validity End Date';
        address_uuid        : UUID        @title: 'Address UUID';
        email_addresses     : Association to many EmailAddress
                                  on email_addresses.address_id = address_id;
}

entity EmailAddress {
    key email_id             : String(50)  @title: 'Email ID';
        address_id           : String(50)  @title: 'Address ID';
        email_address        : String(200) @title: 'Email Address';
        search_email_address : String(200) @title: 'Search Email Address';
        ordinal_number       : Integer     @title: 'Ordinal Number';
        is_default_email     : Boolean     @title: 'Is Default Email Address';
}
