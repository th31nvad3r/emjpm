import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

import {
  ENQUETE,
  ENQUETE_WITH_REPONSE_STATUS,
} from "~/components/Enquete/queries";
import { UPLOAD_ENQUETE_EXCEL_FILE } from "~/components/EnqueteImport/mutations";
import { fileReader } from "~/util/fileReader";

function useEnqueteImportManager({ enqueteId, userId }) {
  const [importSummary, setImportSummary] = useState();
  const [uploadFile, { loading: enqueteImportLoading }] = useMutation(
    UPLOAD_ENQUETE_EXCEL_FILE
  );
  const {
    data: enqueteData,
    loading: enqueteLoading,
    error: enqueteError,
  } = useQuery(ENQUETE, {
    variables: { id: enqueteId },
  });
  const enquete = enqueteData ? enqueteData.enquetes_by_pk : undefined;

  const {
    data: enqueteReponseData,
    loading: enqueteReponseLoading,
    error: enqueteReponseError,
  } = useQuery(ENQUETE_WITH_REPONSE_STATUS, {
    variables: { enqueteId, userId },
  });
  const enqueteReponse = enqueteReponseData
    ? enqueteReponseData.enquete_reponse_validation_status
    : undefined;

  function readFile(file, cb, err) {
    if (file) {
      fileReader.readBinaryFileAsBase64(file, cb, err);
    }
  }

  function importEnqueteFile(file) {
    readFile(file, ({ content }) => {
      uploadFile({
        variables: {
          content,
          enqueteId,
          userId,
        },
      })
        .then(
          ({
            data: {
              upload_enquete_file: { data },
            },
          }) => {
            const importSummary = JSON.parse(data);
            setImportSummary(importSummary);
          }
        )
        .catch(() => {
          setImportSummary({
            unexpectedError: true,
          });
        });
    });
  }

  function reset() {
    setImportSummary(undefined);
  }

  return {
    enquete,
    enqueteReponse,
    error: enqueteReponseError || enqueteError,
    importEnqueteFile,
    importSummary,
    loading: enqueteReponseLoading || enqueteLoading,
    reset,
    uploading: enqueteImportLoading,
  };
}

export { useEnqueteImportManager };
