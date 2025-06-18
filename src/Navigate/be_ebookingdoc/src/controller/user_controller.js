const db = require("../helper/database");
const UserService = require("../service/authservice");

class UserController {
  static async login(req, res) {
    try {
      const result = await UserService.login(req.body);
       res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        code: error.statusCode || 500,
        message: error.message,
      });
    }
  }
 static async register(req, res) {
  try {
    console.log("Full request object:", req.body);

    // Không truyền req.file, chỉ lấy body
    const result = await UserService.register(req.body);
    return res.status(200).json(result); // Trả về 200 khi thành công
  } catch (error) {
    console.error("Error in UserController.register:", error);
    return res.status(200).json({
      code: error.statusCode || 500,
      message: error.message,
    }); // Trả về 200 với thông tin lỗi
  }
}


  static async getDetailInfo(req, res) {
    try {
      const { id } = req.params;
      const result = await UserService.getDetailInfo(id);
      return res.status(result.code).json({
        code: result.code,
        data: result.data,
        message: result.message,
      });
    } catch (error) {
      console.error("Error in UserController.getDetailInfo:", error);
      return res.status(500).json({
        code: 500,
        data: null,
        message: "Internal server error",
      });
    }
  }

  static async getDetailInfo(req, res, next) {
    try {
      const result = await UserService.getDetailInfo(req.payload.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const result = await UserService.refreshToken(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const result = await UserService.updateProfile(req.payload.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res) {
    try {
      const premission_id = req.query.premission_id
        ? parseInt(req.query.premission_id)
        : null;

      if (premission_id !== null && isNaN(premission_id)) {
        return res.status(400).json({
          code: 400,
          message: "premission_id phải là một số nguyên!",
        });
      }

      const result = await UserService.getAll(premission_id);

      return res.status(result.code).json({
        code: result.code,
        data: result.data,
        message: result.message,
      });
    } catch (error) {
      console.error("Error in UserController.getAll:", error);
      return res.status(error.statusCode || 500).json({
        code: error.statusCode || 500,
        message: error.message || "Lỗi server khi lấy danh sách người dùng",
      });
    }
  }

  static async getById(req, res) {
  try {
    const { id } = req.params;
    const result = await UserService.getById(id);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error("Error in UserController.getById:", error);
    return res.status(error.statusCode || 500).json({
      code: error.statusCode || 500,
      message: error.message || "Lỗi server khi lấy thông tin user",
    });
  }
}

  // static async changePassword(req, res, next) {
  //   try {
  //     const result = await UserService.changePassword(req.payload.id, req.body);
  //     res.json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async changeStatus(req, res, next) {
  //   try {
  //     const result = await UserService.changeStatus(req.payload.id, req.body);
  //     res.json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = UserController;
