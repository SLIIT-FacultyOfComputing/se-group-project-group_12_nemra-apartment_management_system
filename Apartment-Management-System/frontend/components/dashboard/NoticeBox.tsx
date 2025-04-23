import React from "react";

interface NoticeBoxProps {
  imageUrl: string;
  postName: string;
  description: string;
}

const NoticeBox: React.FC<NoticeBoxProps> = ({ imageUrl, postName, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        {/* Image */}
        <div className="flex justify-center mb-4">
          <img
            src={imageUrl}
            alt="Post Image"
            className="h-40 w-40 object-cover rounded-lg"  // Adjusted size (h-40 and w-40 for a larger image)
          />
        </div>

        {/* Post Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{postName}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default NoticeBox;
