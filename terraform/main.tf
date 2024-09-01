# ----------------------- VPC -----------------------

resource "aws_vpc" "default_vpc" {
  cidr_block = var.vpc_cidr_block

  tags = {
    Name = "Default VPC"
  }
}

# ----------------------- Subnet -----------------------

resource "aws_subnet" "public_subnet" {
  vpc_id            = aws_vpc.default_vpc.id
  cidr_block        = "12.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "Public Subnet"
  }
}

# ----------------------- Internet Gateway -----------------------

resource "aws_internet_gateway" "default_ig" {
  vpc_id = aws_vpc.default_vpc.id

  tags = {
    Name = "Internet Gateway"
  }
}

# ----------------------- Route Table -----------------------

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.default_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.default_ig.id
  }

  tags = {
    Name = "Public Route Table"
  }
}

resource "aws_route_table_association" "public_1_rt_a" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# ----------------------- Security Group -----------------------

resource "aws_security_group" "web_sg" {
  name        = "HTTP and SSH"
  vpc_id      = aws_vpc.default_vpc.id
  description = "Allow all inbound traffic for internet"

  ingress {
    description = "HTTP from VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH from VPC"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ----------------------- EC2 -----------------------

resource "aws_instance" "web_instance" {
  ami           = "ami-066784287e358dad1"
  instance_type = "t3.medium"

  subnet_id                   = aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.web_sg.id]
  associate_public_ip_address = true

  user_data = <<-EOF
    #!/bin/bash
    sudo yum update -y
    sudo yum install -y docker

    sudo systemctl start docker
    sudo systemctl enable docker
    sudo docker pull shyamal24/codeit:latest

    sudo docker run -d -p 80:8080 shyamal24/codeit:latest
  EOF
  tags = {
    "Name" : "Shyamal's Web Server"
  }
}
