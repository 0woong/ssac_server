const con = require("../../../modules/mysql");

const authController = {
  signin: (req, res) => {
    const { id, password } = req.body;
    const sql = "select *from user where id = ? and password";
    const params = [id, password];

    con.query(sql, params, (err, result) => {
      if (err)
        return res.status(500).json({
          message: "DB 서버 에러",
        });

      if (result.length !== 0) {
        // 존재하는 경우
        res.status(200).json({
          message: "로그인 성공",
        });
      } else {
        // 존재하지 않는 경우
        res.status(400).json({
          message: "해당 유저가 없습니다",
        });
      }
    });
  },

  signup: (req, res) => {
    const { id, name, password } = req.body;
    // 중복된 유저가 존재하는지
    const sql1 = "select * from user where id = ?";
    const params1 = [id];
    // 유저를 생성
    const sql2 = "insert into board (id, name, password) values(?,?,?)";
    const params2 = [id, name, password];

    con.query(sql1, params1, (err, result) => {
      if (err)
        return res.status(500).json({
          message: "DB 서버에러",
        });

      if (result.length !== 0) {
        // 중복된 아이디가 존재하는 경우
        res.status(400).json({
          message: "중복된 아이디가 존재합니다",
        });
      } else {
        // 유저가 존재하지 않는 경우
        con.query(sql2, params2, (err, result) => {
          if (err)
            return res.status(500).json({
              message: "DB 서버 에러",
            });
          res.status(200).json({
            message: "회원가입 성공",
          });
        });
      }
    });
  },
};

module.exports = authController;
