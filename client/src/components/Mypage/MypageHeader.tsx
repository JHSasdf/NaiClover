import '../../styles/MypageHeader.scss';

function MypageHeader() {
  return (
    <div className="mypageHeaderC">
      <div className="logoC">
        <div>
          <img src="images/Cell.png" alt="" />
        </div>
        <div>
          <img src="images/Gear.png" alt="" />
        </div>
      </div>
      <div className="followC">
        <div className="aDiv">1</div>
        <div className="bDiv">2</div>
        <div className="cDiv">3</div>
      </div>
    </div>
  );
}

export default MypageHeader;
