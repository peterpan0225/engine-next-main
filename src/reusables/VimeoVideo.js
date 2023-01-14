import Vimeo from "@u-wave/react-vimeo";

const VimeoVideo = ({ videoID = "604334223", text = "" }) => {
  return (
    <div>
      <div style={{ paddingTop: "56.25%", position: "relative" }}>
        <Vimeo video={videoID} />
      </div>
      {text && <p className="text-2xl font-bold my-2">{text}</p>}
    </div>
  );
};

export default VimeoVideo;
