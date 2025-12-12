import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = prompt => {
  return new Promise(resolve => {
    rl.question(prompt, resolve)
  })
}

const createAdmin = async () => {
  try {
    // Get MongoDB URI from environment or use default
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/techlabs'

    console.log('🔗 Connecting to MongoDB...')
    await mongoose.connect(mongoUri)
    console.log('✅ Connected to MongoDB\n')

    // Get admin details from user
    const email = await question('Admin email: ')
    const password = await question('Admin password (min 8 characters): ')
    const firstName = await question('First name (optional): ')
    const lastName = await question('Last name (optional): ')

    if (!email || !password) {
      console.error('❌ Email and password are required')
      process.exit(1)
    }

    if (password.length < 8) {
      console.error('❌ Password must be at least 8 characters')
      process.exit(1)
    }

    // Define User schema
    const UserSchema = new mongoose.Schema({
      email: String,
      password: String,
      role: String,
      firstName: String,
      lastName: String,
      isActive: Boolean,
    })

    const User = mongoose.model('User', UserSchema)

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      console.error('❌ User with this email already exists')
      process.exit(1)
    }

    // Hash password
    console.log('\n🔐 Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin user
    console.log('👤 Creating admin user...')
    const admin = await User.create({
      email,
      password: hashedPassword,
      role: 'admin',
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      isActive: true,
    })

    console.log('\n✅ Admin user created successfully!')
    console.log(`📧 Email: ${admin.email}`)
    console.log(`🆔 ID: ${admin._id}`)
    console.log(`👤 Role: ${admin.role}\n`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    rl.close()
  }
}

createAdmin()
