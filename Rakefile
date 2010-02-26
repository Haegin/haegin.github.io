require 'date'

def jekyll(opts = "", path = "../jekyll/bin/")
  sh "rm -rf _site"
  sh path + "jekyll " + opts
end

desc "Create a new draft post"
task :post do
    title = ENV['TITLE']
    slug = "#{Date.today}-#{title.downcase.gsub(/[^w]+/, '-')}"

    file = File.join(
        File.dirname(__FILE__),
        '_posts',
        slug + '.markdown'
    )

    File.open(file, 'w') do |f|
        f << <<-EOS.gsub(/^    /, "")
        ---
        layout: post
        title: #{title}
        published: false
        categories: 
        ---

        EOS
    end

    system ("#{ENV['EDITOR']} #{file}")
end

desc "Build site using Jekyll"
task :build do
  jekyll
end

desc "Serve on Localhost with port 4000"
task :default do
  jekyll("--server --auto")
end

task :stable do
  jekyll("--server --auto", "")
end

desc "Deploy to Dev"
task :deploy => :"deploy:dev"

namespace :deploy do
  desc "Deploy to Dev"
  task :dev => :build do
    rsync "dev.appden.com"
  end
  
  desc "Deploy to Live"
  task :live => :build do
    rsync "appden.com"
  end
  
  desc "Deploy to Dev and Live"
  task :all => [:dev, :live]
  
  def rsync(domain)
    sh "rsync -rtz --delete _site/ scottwkyle@appden.com:~/#{domain}/"
  end
end

