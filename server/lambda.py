import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('message')

def lambda_handler(event, context):
    # TODO implement
    
    id = event['id']
    name = event['name']
    message=event['message']
    source = event['email']
    destination = "ameytarfe@gmail.com"
    
    db_message = dynamodb_response = insert_dynamodb(id, name, message)
    print(event)
    
    ses_message = sendEmail(source, name, name, message, destination)
    print(ses_message)
    
    return {
        'statusCode': 200,
        'body': json.dumps('You did it!!')
    }
    
    
def insert_dynamodb(id, name, message, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        
    table = dynamodb.Table('message')
    response = table.put_item(
            Item={
                'id': id,
                'name': name,
                'message': message
            }
        )
    return response    
    

def sendEmail(source, name, subject, message, destination):
    
    _message = "Message from: "+name+" \nEmail: "+source+ "\nMessage content: "+message
    
    client = boto3.client('ses')
    
    response = client.send_email(
        Destination={
            'ToAddresses': [destination]
        },
        Message={
            'Body': {
                'Text': {
                    'Charset': 'UTF-8',
                    'Data': _message,
                },
            },
            'Subject': {
                'Charset': 'UTF-8',
                'Data': subject,
            },
        },
        Source=source,
        )
        
    return _message    