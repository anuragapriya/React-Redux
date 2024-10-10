// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const DocumentViewer = () => {
//   const location = useLocation();
//   const { url } = location.state || {};
//      return (
//     <iframe
//       title="Document Viewer"
//       src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
//       width="100%"
//       height="600"
//     />
//   );
// };

// export default DocumentViewer;

import React, { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const DocumentViewer = ({ open, handleClose, url }) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    try {
      const documents = [
       // { uri: require("../assets/files/Users.pdf") },
        { uri: require("../assets/files/TimeSheet.JPG") },
      ];
      setDocs(documents);
    } catch (error) {
      console.error("Error loading documents:", error);
    }
  }, []);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box className="modalpopup">
          <Box className="row modalpopupinner">
            {docs.length > 0 ? (
              <DocViewer  pluginRenderers={DocViewerRenderers} documents={docs} />              
            ) : (
              <p>Loading documents...</p>
            )}
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default DocumentViewer;
