function ArpeggiatorSelect({ selectedArp, setSelectedArp }) {
  return (
    <div className="form-group">
      <label htmlFor="arpeggiatorSelect">Select Arpeggiator:</label>
      <select
        id="arpeggiatorSelect"
        className="form-select"
        value={selectedArp}
        onChange={(e) => setSelectedArp(e.target.value)}
      >
        <option value="0">Arpeggiator 1</option>
        <option value="1">Arpeggiator 2</option>
      </select>
    </div>
  );
}

export default ArpeggiatorSelect;
