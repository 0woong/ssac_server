const con = require("../../../modules/mysql");

const boardController = {
  readAllBoard: (req, res) => {
    const sql = "select * from ";
    con.query(sql, (err, result) => {
      if (err)
        return res.status(500).json({
          message: "DB 서버 에러",
        });

      if (result.length === 0) {
        // 결과 값이 없을 경우
        res.status(401).json({
          message: "결과 값이 없습니다",
        });
      } else {
        // 결과 값이 있을 경우
        res.status(200).json({
          message: "조회 성공",
          data: result,
        });
      }
    });
  },
  detaileBoard: (req, res) => {
    const { idx } = req.params;
    const sql = "select * from board where boardIdx = ?";
    const params = [idx];

    con.query(sql, params, (err, result) => {
      if (err)
        return res.status(500).json({
          message: "DB 서버 에러",
        });

      if (result.length !== 0) {
        // 결과 값이 있을 때
        res.status(200).json({
          message: "조회 성공",
        });
      } else {
        // 결과 값이 없을 때
        res.status(401).json({
          message: "결과 값이 없습니다",
        });
      }
    });
  },
  createBoard: (req, res) => {
    const { title, content, boardPw, writer } = req.body;
    const sql =
      "insert into board (title, content, boardPw, writer) values (?,?,?,?)";
    const params = [title, content, boardPw, new Date(), writer];
    con.query(sql, params, (err, result) => {
      if (err)
        return res.status(500).json({
          message: "DB 서버 에러",
        });
      res.status(200).json({
        message: "생성 성공",
      });
    });
  },
  deleteBoard: (req, res) => {
    const { idx } = req.params;
    const sql = "delete from board where boardIdx = ?";
    const params = [idx];

    con.query(sql, params, (err, result) => {
      if (err)
        return res.status(500).json({
          message: "DB 서버 에러",
        });
      res.status(200).json({
        message: "삭제 완료",
      });
    });
  },
};

module.exports = boardController;
