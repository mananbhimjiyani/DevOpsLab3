import boto3 #sdk used to create aws resources in the cloud

ecr_client = boto3.client('ecr', region_name='ap-south-1') #client to interact with ecr service

repository_name = 'my-cloud-native-repo' #name of the repository to be created
response = ecr_client.create_repository(repositoryName=repository_name) #create the repository in ecr

repository_uri = response['repository']['repositoryUri'] #get the uri of the repository created
print(f"Repository URI: {repository_uri}") #print the uri of the repository created
# The repository URI can be used to push Docker images to the ECR repository