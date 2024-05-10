import "./BusinessHours.scss";

const BusinessHours = ({
  business,
  businessHours,
  showHours,
  setShowHours,
}) => {
  return (
    <div className="BusinessHours">
      {business.is_store ? (
        <div className="BusinessHours__Container">
          <div className="BusinessHours__Container__Periods">
            <div>
              <h6>Hours</h6>
            </div>
            <div className="BusinessHours__Container__Content">
              {businessHours.map((el, index) => {
                return (
                  <div key={index} className="BusinessHours__Container__Content__DayDetails">
                    <div className="BusinessHours__Container__Content__DayDetails__Day">
                      {el.split(" ")[0].replace(":", " ").slice(0, 3)}
                    </div>
                    <div className="BusinessHours__Container__Content__DayDetails__Hour">
                      <p>{el.split(" ")[1]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="BusinessHours__Container__CloseButton">
            <button onClick={() => setShowHours(!showHours)}>X</button>
          </div>
        </div>
      ) : (
        <h5>This Business Is Online Only!</h5>
      )}
    </div>
  );
};

export default BusinessHours;
