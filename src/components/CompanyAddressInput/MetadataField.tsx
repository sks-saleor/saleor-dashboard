import React, { useState } from "react";
import FileUploadField from "../FileUploadField";
import { MetadataInput, useFileUploadMutation } from "@dashboard/graphql";
import useNotifier from "@dashboard/hooks/useNotifier";
import { useIntl } from "react-intl";
import { errorMessages } from "@dashboard/intl";
import { Box as BoxImage } from "@saleor/macaw-ui/next";
import { Box } from "@material-ui/core";

interface MetadataFieldProps {
  disabled?: boolean;
  name: string;
  onUploaded: (url: string, name: string) => void;
  metadata: MetadataInput[];
}
export const MetadataField: React.FC<MetadataFieldProps> = ({
  disabled,
  name,
  onUploaded,
  metadata,
}) => {
  const notify = useNotifier();
  const intl = useIntl();
  const [processing, setProcessing] = useState(false);
  const [uploadFile] = useFileUploadMutation({});

  const handleFileUpload = async (file: File) => {
    setProcessing(true);

    const { data } = await uploadFile({ variables: { file } });

    if (data?.fileUpload?.errors?.length) {
      notify({
        status: "error",
        title: intl.formatMessage(errorMessages.imgageUploadErrorTitle),
        text: intl.formatMessage(errorMessages.imageUploadErrorText),
      });
    } else {
      onUploaded(data?.fileUpload?.uploadedFile?.url, name);
    }
    setProcessing(false);
  };

  const handleFileDelete = () => onUploaded("", name);

  const value = metadata.find(m => m.key === name)?.value;

  return (
    <Box display="flex" flexDirection="column" my={2}>
      <Box height={180} width={180} display="flex">
        <BoxImage
          {...commonThumbnailProps}
          as="img"
          alt={name}
          objectFit="scale-down"
          src={value}
        />
      </Box>
      <Box display="flex">
        <FileUploadField
          disabled={disabled || processing}
          loading={processing}
          file={{ label: "", value: "", file: undefined }}
          inputProps={{ accept: "image/*" }}
          onFileUpload={handleFileUpload}
          onFileDelete={handleFileDelete}
        />
      </Box>
    </Box>
  );
};

const commonThumbnailProps = {
  borderColor: "neutralHighlight",
  borderStyle: "solid",
  borderWidth: 1,
  marginBottom: 1.5,
  borderRadius: 3,
  aspectRatio: "1 / 1",
} as const;
