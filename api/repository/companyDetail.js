const CompanyDetails = require("../models/companyDetails");
const User = require("../models/user");

const companyRepo = {
  register: async (req, res) => {
    const newCompany = new CompanyDetails({
      user_id: req.body.user_id,
      company_name: req.body.company_name,
      company_address: req.body.company_address,
      company_phone: req.body.company_phone,
      company_email: req.body.company_email,
      state: req.body.state,
      city: req.body.city,
      designation: req.body.designation,
      person_name: req.body.person_name,
    });
    await newCompany.save();

    await User.findByIdAndUpdate(
      { _id: req.body.user_id },
      {
        $set: {
          companyDetails: true,
          company: newCompany._id,
          name: newCompany.person_name,
        },
      }
    );

    res
      .status(200)
      .json({ msg: "Company Registered Successfully", newCompany });
  },
  updateCompanyDetails: (req, res) => {
    CompanyDetails.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          company_name: req.body.company_name,
          company_address: req.body.company_address,
          company_phone: req.body.company_phone,
          company_email: req.body.company_email,
          state: req.body.state,
          city: req.body.city,
          designation: req.body.designation,
          person_name: req.body.person_name,
        },
      }
    )
      .then((result) => {
        res.status(200).json({ msg: "Data Updated Successfully" });
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  deleteCompanyDetails: async (req, res) => {
    CompanyDetails.findOne({ _id: req.params.id })
      .populate("user_id")
      .then((result) => {
        User.findOneAndUpdate(
          { _id: result.user_id._id },
          {
            $set: {
              companyDetails: false,
            },
          }
        ).exec();
      });

    CompanyDetails.findByIdAndDelete({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({ msg: "Data Deleted Successfully" });
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getAllCompanyDetails: (req, res) => {
    CompanyDetails.find()
      .populate("user_id")
      .then((result) => {
        res.status(200).json({
          companyData: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getOneCompnayById: (req, res) => {
    CompanyDetails.findById(req.params.id)
      .populate("user_id")
      .then((result) => {
        res.status(200).json({
          companyData: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
};

module.exports = companyRepo;
