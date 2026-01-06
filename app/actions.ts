"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"

export async function createResolution(formData: FormData) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    redirect("/login")
  }

  const title = formData.get("title")?.toString()
  if (!title) return

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect("/login")
  }

  await prisma.resolution.create({
    data: {
      title,
      userId: user.id,
    },
  })

  redirect("/resolutions")
}

export async function checkIn(resolutionId: string) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  if (!user) {
    throw new Error("Unauthorized")
  }

  const resolution = await prisma.resolution.findFirst({
    where: {
      id: resolutionId,
      userId: user.id,
    },
  })

  if (!resolution) {
    throw new Error("Resolution not found")
  }

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  await prisma.progress.upsert({
    where: {
      resolutionId_date: {
        resolutionId,
        date: today,
      },
    },
    update: {},
    create: {
      resolutionId,
      date: today,
    },
  })

  revalidatePath("/resolutions")
}

export async function updateResolution(
  id: string,
  formData: FormData
) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title")?.toString()
  if (!title) return

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  if (!user) throw new Error("Unauthorized")

  await prisma.resolution.update({
    where: {
      id,
      userId: user.id,
    },
    data: { title },
  })

  redirect("/resolutions")
}

export async function deleteResolution(id: string) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  if (!user) throw new Error("Unauthorized")

  await prisma.resolution.delete({
    where: {
      id,
      userId: user.id,
    },
  })

  redirect("/resolutions")
}