package com.ecommerce.ecommerce_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.core.sync.RequestBody;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Client s3;
    private final String bucketName;

    public S3Service(
            @Value("${cloud.aws.s3.access-key}") String accessKey,
            @Value("${cloud.aws.s3.secret-key}") String secretKey,
            @Value("${cloud.aws.s3.region}") String region,
            @Value("${cloud.aws.s3.bucket}") String bucketName
    ) {
        this.bucketName = bucketName;

        AwsBasicCredentials creds = AwsBasicCredentials.create(accessKey, secretKey);
        System.out.println("S3 Service initialized with bucket: " + bucketName + " and access key: " + accessKey);
        this.s3 = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(creds))
                .build();
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        PutObjectRequest putReq = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(uniqueFileName)
                .acl(ObjectCannedACL.PUBLIC_READ)
                .contentType(file.getContentType())
                .build();

        try {
            s3.putObject(putReq, RequestBody.fromBytes(file.getBytes()));
        } catch (Exception e) {
            e.printStackTrace();
            throw new IOException("Failed to upload file to S3", e);
        }

        return "https://" + bucketName + ".s3.amazonaws.com/" + uniqueFileName;
    }
}
