const vendorService = require('../services/vendorService');

// Create vendor
exports.createVendor = async (req, res) => {
  try {
    const { first_name, last_name, address, phone_number, email, zip_code } = req.body;
    const vendor = await vendorService.createVendor({ first_name, last_name, address, phone_number, email, zip_code });
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List vendors
exports.getVendorList = async (req, res) => {
  try {
    const vendors = await vendorService.getVendorList();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit vendor
exports.editVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await vendorService.getVendorById(id);

    if (!vendor) {
      return res.status(404).json({ error: 'vendor not found' });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update vendor
exports.updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, address, phone_number, email, zip_code } = req.body;

    const updatedvendor = await vendorService.updateVendor(id, { first_name, last_name, address, phone_number, email, zip_code });

    if (!updatedvendor) {
      return res.status(404).json({ error: 'vendor not found' });
    }

    res.status(200).json(updatedvendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete vendor
exports.deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await vendorService.deleteVendor(id);

    if (!result) {
      return res.status(404).json({ error: 'vendor not found' });
    }

    res.status(200).json({ message: 'vendor deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
