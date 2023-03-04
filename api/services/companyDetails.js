const CompanyDetails = require('../models/companyDetails');
const companyRepo = require('../repository/companyDetail');

const Company_Detail = {
    comp_register: async (req, res) => {
        try {
            console.log(req.body.company_email);
            const comEmail = await CompanyDetails.findOne({ company_name:req.body.company_name });
             
            if (comEmail) return res.status(404).json({ msg: "Company Already Exist" })
          
            companyRepo.register(req, res)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    deletedata: (req, res) => {
        companyRepo.deleteCompanyDetails(req, res)
        
    },
    updatedata:  (req, res) => {
    companyRepo.updateCompanyDetails(req, res)
 
    },
    getAllCompnaysDetails:(req, res) => {
    companyRepo.getAllCompanyDetails(req, res)

    },

    getOneCompnayById:(req, res) => {
    companyRepo.getOneCompnayById(req, res)

    }
}

module.exports = Company_Detail