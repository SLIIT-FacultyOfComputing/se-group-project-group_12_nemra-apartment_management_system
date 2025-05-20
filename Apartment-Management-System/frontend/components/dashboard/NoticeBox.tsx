import React from "react";

interface NoticeBoxProps {
  postName: string;
  description: string;
}

const NoticeBox: React.FC<NoticeBoxProps> = ({ postName, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        {/* Post Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{postName}</h3>
        {/* Description */}
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default NoticeBox;
