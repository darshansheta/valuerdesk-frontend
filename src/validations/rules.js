import _ from "lodash"

const abstract = {
    name: 'required|max:200',
    FMLName: 'required|max:50',
    phone: 'required|max:20|numeric',
    email: 'required|email|max:200',
    address: {
        address: 'required|max:200',
        landmark:'required|max:200',
        locality:'required|max:200',
        pincode: 'required|max:6|min:6|numeric',
        subdistrict: 'max:50',
        district: 'required|max:50',
        state: 'required|max:50',
    }
};

const rules = {
        client: {
            name: abstract.name,
            phone: abstract.phone,
            address: abstract.address
        },
        clientBranch: {
            name: abstract.name,
            code: 'required|max:50',
            phone: abstract.phone,
            address: abstract.address
        },
        clientUser:{
            name: abstract.name,
            phone: abstract.phone,
            email: abstract.email,
            branchId: 'required|numeric'
        },
        report:{
            name: 'required'
        },
        order: {
            clientId:'required|numeric',
            clientUserId:'required|numeric',
            clientReportId:'required|numeric',
            dueAt:{ required:true,date_format:'yyyy-MM-dd HH:mm:ss' },//'required|date_format:YYYY-MM-DD HH',
            referenceNumber:'required|max:50|alpha_dash',
            fee:'required|decimal:2|min_value:0|max_value:999999',
            address: abstract.address,
            borrower:{
                firstName: abstract.FMLName,
                lastName: abstract.FMLName,
                middleName: 'max:50',
                phone: 'required',
                email: 'email|max:200',
            }
        },
        staff: {
            name: abstract.name,
            phone: abstract.phone,
            email: abstract.email,
            username:'required|alpha_num|min:4|username_unique',
            password: 'required|min:4',
            roleId:'required|numeric'
        }
    } 
export default (path) => {
    return _.get(rules,path)
}